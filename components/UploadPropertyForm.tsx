// components/UploadPropertyForm.tsx
import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { uploadProperty } from '../lib/easybroker'

export default function UploadPropertyForm() {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const toast = useToast()

  const handleSubmit = async () => {
    if (!title || !price || !image) {
      toast({
        title: 'Faltan campos.',
        description: 'Por favor completa todos los campos.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    await uploadProperty({ title, price, image })
    toast({
      title: 'Propiedad subida',
      description: 'Se ha subido la propiedad exitosamente (simulado)',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })

    setTitle('')
    setPrice('')
    setImage('')
  }

  return (
    <Box p={8}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Título</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Precio</FormLabel>
          <Input value={price} onChange={(e) => setPrice(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>URL de Imagen</FormLabel>
          <Input value={image} onChange={(e) => setImage(e.target.value)} />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Subir Propiedad
        </Button>
      </VStack>
    </Box>
  )
}
