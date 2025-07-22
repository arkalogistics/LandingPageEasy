// components/PropertyCard.tsx
import { Box, Image, Text } from '@chakra-ui/react'

type Property = {
  id: string
  title: string
  price: string
  image: string
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
      <Image
        src={property.image}
        alt={property.title}
        objectFit="cover"
        width="100%"
        height="200px"
      />
      <Box p="4">
        <Text fontSize="lg" fontWeight="bold">
          {property.title}
        </Text>
        <Text color="gray.500">{property.price}</Text>
      </Box>
    </Box>
  )
}
