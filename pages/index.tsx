// pages/index.tsx
import {
  Box,
  Heading,
  SimpleGrid,
  Flex,
  Spacer,
  Button,
  Text,
  Stack,
  Container,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { getProperties } from '../lib/easybroker'
import PropertyCard from '../components/PropertyCard'

type Property = {
  id: string
  title: string
  price: string
  image: string
}

interface Props {
  properties: Property[]
}

export const getStaticProps: GetStaticProps = async () => {
  const properties = await getProperties()
  return { props: { properties } }
}

export default function Home({ properties }: Props) {
  return (
    <Box>
      {/* Navbar */}
      <Flex
        as="nav"
        p={4}
        bg="blue.600"
        color="white"
        align="center"
        boxShadow="md"
      >
        <Heading size="md">EasyReal</Heading>
        <Spacer />
        <Stack direction="row" spacing={4}>
          <Link href="/" passHref>
            <Button as="a" variant="ghost" color="white">
              Inicio
            </Button>
          </Link>
          
          <Link href="/admin" passHref>
            <Button as="a" variant="outline" color="white" _hover={{ bg: 'whiteAlpha.300' }}>
              Admin
            </Button>
          </Link>
        </Stack>
      </Flex>

      {/* Hero */}
      <Box
        bg="blue.50"
        py={{ base: 10, md: 20 }}
        textAlign="center"
        px={4}
        borderBottom="1px solid #e0e0e0"
      >
        <Container maxW="3xl">
          <Heading size="2xl" mb={4}>
            Encuentra tu próximo hogar ideal
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Navega entre propiedades destacadas y crea campañas increíbles desde una sola plataforma.
          </Text>
        </Container>
      </Box>

      {/* Propiedades */}
      <Box px={8} py={16}>
        <Heading size="lg" mb={6}>
          Propiedades destacadas
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </SimpleGrid>
      </Box>

      {/* Footer */}
      <Box bg="gray.100" py={6} textAlign="center">
        <Text fontSize="sm" color="gray.600">
          © {new Date().getFullYear()} EasyReal. Todos los derechos reservados.
        </Text>
      </Box>
    </Box>
  )
}
