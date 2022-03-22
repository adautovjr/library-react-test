import { useState } from 'react'
import { createBook } from '../services/books'

interface BookCreateFormProps {
  onClose: () => void
  setError: (errorMessage: string) => void
}

const BookCreateForm = ({ onClose, setError }: BookCreateFormProps) => {
  const [imageURL, setImageURL] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [name, setName] = useState('')

  const handleCreateBook = async () => {
    try {
      await createBook({
        name,
        image: imageURL
      })
      onClose()
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      {imagePreview !== '' && (
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
          <img
            src={imagePreview}
            alt={imagePreview}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        </div>
      )}
      <div className="mt-4 flex justify-between flex-col">
        <label
          htmlFor="street-address"
          className="block text-sm font-medium text-gray-700"
        >
          Image URL
        </label>
        <input
          type="text"
          name="image"
          id="image"
          autoComplete="image"
          value={imageURL}
          onChange={(e) => setImageURL(e.currentTarget.value)}
          onBlur={() => setImagePreview(imageURL)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-4 flex justify-between flex-col">
        <div>
          <label
            htmlFor="street-address"
            className="block text-sm font-medium text-gray-700"
          >
            Book name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadowm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <p className="text-sm font-medium text-gray-900">{null}</p>
      </div>
      <button
        type="button"
        onClick={() => handleCreateBook()}
        className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create
      </button>
    </>
  )
}

export default BookCreateForm
