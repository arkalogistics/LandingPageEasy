import { useEffect, useState } from 'react'
import {
  Box, Button, Select, Textarea, Heading, VStack, Input,
} from '@chakra-ui/react'
import { getProperties } from '../lib/easybroker'
import { useAdminAccess } from '../lib/useAdminAccess'

type Property = {
    id: string
    title: string
    price: string
    image: string
  }
  
  export default function ContentBotPage() {
    const { access, verify } = useAdminAccess()
    const [pass, setPass] = useState('')
    const [properties, setProperties] = useState<Property[]>([]) // ✅ FIX HERE
    const [selectedId, setSelectedId] = useState('')
    const [content, setContent] = useState('')
  
    useEffect(() => {
      if (access) {
        getProperties().then(setProperties)
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

  const generate = () => {
    const property = properties.find((p: any) => p.id === selectedId)
    if (!property) return
    const frases = [
      `🏠 Descubre "${property.title}" por solo ${property.price}`,
      `✨ Vive en "${property.title}" ¡Tu nueva casa te espera!`,
    ]
    const text = frases[Math.floor(Math.random() * frases.length)]
    setContent(text)
    const prev = JSON.parse(localStorage.getItem('generatedContent') || '[]')
    localStorage.setItem('generatedContent', JSON.stringify([...prev, text]))
  }

  return (
    <Box p={8}>
      <Heading mb={4}>Generador de Contenido por Propiedad</Heading>
      <VStack spacing={4}>
        <Select placeholder="Selecciona propiedad" onChange={(e) => setSelectedId(e.target.value)}>
          {properties.map((p: any) => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </Select>
        <Textarea value={content} readOnly rows={4} />
        <Button onClick={generate} colorScheme="teal">Generar contenido</Button>
      </VStack>
    </Box>
  )
}
