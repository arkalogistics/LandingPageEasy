// components/CampaignCreator.tsx
import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react'
import { createCampaign } from '../lib/meta'

export default function CampaignCreator() {
  const [name, setName] = useState('')
  const [budget, setBudget] = useState('')
  const [objective, setObjective] = useState('')
  const toast = useToast()

  const handleCreate = async () => {
    if (!name || !budget || !objective) {
      toast({
        title: 'Campos incompletos',
        description: 'Llena todos los campos antes de continuar',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    await createCampaign({ name, budget, objective })
    toast({
      title: 'Campaña creada',
      description: 'Campaña enviada correctamente (simulado)',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })

    setName('')
    setBudget('')
    setObjective('')
  }

  return (
    <Box p={8}>
      <Heading mb={4}>Creador de Campañas Meta Ads</Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Nombre</FormLabel>
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
