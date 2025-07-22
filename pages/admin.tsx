// pages/admin/properties.tsx
import { useState } from 'react'
import UploadPropertyForm from '../components/UploadPropertyForm'
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'

export default function AdminPanel() {
  const [access, setAccess] = useState(false)
  const [input, setInput] = useState('')

  const handleLogin = () => {
    if (input === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAccess(true)
    } else {
      alert('Contraseña incorrecta')
    }
  }

  return (
    <Box>
      {access && (
        <Flex
          as="nav"
          p={4}
          bg="blue.600"
          color="white"
          align="center"
          mb={6}
        >
          <Heading size="md">Admin Panel</Heading>
          <Spacer />
          <Link href="/content-bot" passHref>
            <Button as="a" variant="ghost" color="white">
              Bot Contenido
            </Button>
          </Link>
          <Link href="/ads-campaigns" passHref>
            <Button as="a" variant="ghost" color="white">
              Campañas
            </Button>
          </Link>
        </Flex>
      )}

      <Box p={8}>
        <Heading mb={4}>Panel de Administración</Heading>
        {!access ? (
          <VStack spacing={4}>
            <Input
              type="password"
              placeholder="Ingresa la contraseña"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={handleLogin} colorScheme="blue">
              Entrar
            </Button>
          </VStack>
        ) : (
          <UploadPropertyForm />
        )}
      </Box>
    </Box>
  )
}
