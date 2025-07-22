// lib/easybroker.ts

type Property = {
    id?: string
    title: string
    price: string
    image: string
  }
  
  // Base de datos simulada
  let mockDatabase: Property[] = [
    {
      id: '1',
      title: 'Casa en CDMX con terraza',
      price: '$2,500,000',
      image: '/cdmx.jpg',
    },
    {
      id: '2',
      title: 'Departamento moderno en Polanco',
      price: '$4,200,000',
      image: '/polanco.jpg',
    },
  ]
  
  // Simula obtener propiedades
  export async function getProperties(): Promise<Property[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDatabase), 500)
    })
  }
  
  // Simula subir una propiedad nueva
  export async function uploadProperty(property: Property): Promise<{ success: boolean }> {
    const newId = (mockDatabase.length + 1).toString()
    mockDatabase.push({ ...property, id: newId })
    return { success: true }
  }
  
