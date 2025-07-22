// pages/ads-campaigns.tsx
import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react'
import { createCampaign } from '../lib/meta'
import { useAdminAccess } from '../lib/useAdminAccess'

export default function CampaignPage() {
  const { access, verify } = useAdminAccess()
  const [pass, setPass] = useState('')
  const [contentList, setContentList] = useState<string[]>([])
  const [selectedContent, setSelectedContent] = useState('')
  const [name, setName] = useState('')
  const [budget, setBudget] = useState('')
  const [objective, setObjective] = useState('')
  const toast = useToast()

  useEffect(() => {
    if (access) {
      const stored = JSON.parse(localStorage.getItem('generatedContent') || '[]')
      setContentList(stored)
    }
  }, [access])

  if (!access) {
    return (
      <Box p={8}>
        <Heading mb={4}>Acceso restringido</Heading>
        <Input
          type="password"
          placeholder="Contraseña de admin"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          mb={2}
        />
        <Button onClick={() => verify(pass)}>Entrar</Button>
      </Box>
    )
  }

  const handleCreate = async () => {
    if (!name || !budget || !objective || !selectedContent) {
      toast({
        title: 'Faltan campos',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    await createCampaign({ name, budget, objective })

    toast({
      title: 'Campaña creada',
      description: 'Simulación enviada correctamente',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })

    setName('')
    setBudget('')
    setObjective('')
    setSelectedContent('')
  }

  return (
    <Box p={8}>
      <Heading mb={4}>Creador de Campañas</Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Selecciona contenido</FormLabel>
          <Select
            placeholder="Selecciona una opción"
            value={selectedContent}
            onChange={(e) => setSelectedContent(e.target.value)}
          >
            {contentList.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Nombre campaña</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Presupuesto</FormLabel>
          <Input value={budget} onChange={(e) => setBudget(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Objetivo</FormLabel>
          <Input value={objective} onChange={(e) => setObjective(e.target.value)} />
        </FormControl>

        <Button colorScheme="green" onClick={handleCreate}>
          Crear campaña
        </Button>
      </VStack>
    </Box>
  )
}
