import { Book } from '../data/types'

interface BookSpotType {
  book: Book
  handleBookSelected: (book: Book) => void
}

const BookSpot = ({ book, handleBookSelected }: BookSpotType) => (
  <div className="group relative" onClick={() => handleBookSelected(book)}>
    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
      <img
        src={book.image}
        alt={book.name}
        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
      />
      {book.loaned && <div className="ribbon rounded">Loaned</div>}
    </div>
    <div className="mt-4 flex justify-between">
      <div>
        <h3 className="text-sm text-gray-700">
          <a>
            <span aria-hidden="true" className="absolute inset-0" />
            {book.name}
          </a>
        </h3>
      </div>
    </div>
  </div>
)

export default BookSpot
