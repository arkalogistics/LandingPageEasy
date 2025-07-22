// components/ContentGenerator.tsx
import { useState } from 'react'
import {
  Box,
  Button,
  Textarea,
  Heading,
  VStack,
  useClipboard,
  useToast,
} from '@chakra-ui/react'

export default function ContentGenerator() {
  const [content, setContent] = useState('')
  const { onCopy } = useClipboard(content)
  const toast = useToast()

  const generate = () => {
    const frases = [
      '🏠 Vive en la casa de tus sueños. ¡Contáctanos hoy!',
      '✨ Increíble oportunidad en Polanco, no te la pierdas.',
      '¡Tu nuevo hogar te espera! Descubre nuestras propiedades.',
      '🔑 Propiedades exclusivas a precios increíbles. Consulta ahora.',
    ]
    const frase = frases[Math.floor(Math.random() * frases.length)]
    setContent(frase)
  }

  const handleCopy = () => {
    onCopy()
    toast({
      title: 'Copiado',
      description: 'Texto copiado al portapapeles',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <Box p={8}>
      <Heading mb={4}>Generador de Contenido para Redes</Heading>
      <VStack spacing={4}>
        <Textarea value={content} rows={4} readOnly />
        <Button onClick={generate} colorScheme="teal">
          Generar Contenido
        </Button>
        {content && (
          <Button onClick={handleCopy} colorScheme="gray">
            Copiar al portapapeles
          </Button>
        )}
      </VStack>
    </Box>
  )
}
