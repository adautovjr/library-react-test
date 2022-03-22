import { useState } from 'react'

import { editBook } from '../services/books'
import { Book } from '../data/types'

interface BookEditFormProps {
  book: Book
  onClose: () => void
  setError: (errorMessage: string) => void
}

const BookEditForm = ({ book, onClose, setError }: BookEditFormProps) => {
  const [imageURL, setImageURL] = useState(book.image)
  const [imagePreview, setImagePreview] = useState(book.image)
  const [name, setName] = useState(book.name)
  const [loaned, setLoaned] = useState(book.loaned)

  const handleBookEdit = () => {
    try {
      editBook({
        bookID: book.id,
        name,
        image: imageURL,
        loaned
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
      <div className="flex items-start mt-5">
        <div className="flex items-center h-5">
          <input
            id="loaned"
            name="loaned"
            checked={loaned}
            onClick={(e) => setLoaned(!loaned)}
            type="checkbox"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="loaned" className="font-medium text-gray-700">
            Loaned
          </label>
        </div>
      </div>
      <button
        type="button"
        onClick={() => handleBookEdit()}
        className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </>
  )
}

export default BookEditForm
