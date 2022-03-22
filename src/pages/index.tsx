import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, SearchIcon } from '@heroicons/react/outline'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

import { useAuth } from '../hooks/use-auth'
import { getBooks, loanBook, deleteBook } from '../services/books'
import SlideOver from '../components/slide-over'
import BookSpot from '../components/book-spot'
import BookCreateForm from '../components/book-create-form'
import BookEditForm from '../components/book-edit-form'
import ErrorModal from '../components/error-modal'
import { classNames } from '../helpers/class-names-helper'
import { AUTH_TOKEN_NAME, Book, MenuOption } from '../data/types'

const navigation = ['Books', 'Loans']
const profile = ['Your Profile', 'Settings']

interface BooksProps {
  defaultBooks: Book[]
}

export default function Books({ defaultBooks }: BooksProps) {
  const { user } = useAuth()
  const [books, setBooks] = useState<Book[]>(defaultBooks)
  const [error, setError] = useState<string>('')
  const [selectedBook, setSelectedBook] = useState<any>()
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false)
  const [showBookDetail, setShowBookDetail] = useState<boolean>(false)
  const [showCreateBook, setShowCreateBook] = useState<boolean>(false)
  const [showEditBook, setShowEditBook] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')

  const bookDetailMenuOptions: MenuOption[] = [
    {
      name: 'Edit',
      current: false,
      handleClick: () => handleBookEdit()
    },
    {
      name: 'Delete',
      current: false,
      handleClick: () => handleBookDeleted(selectedBook.id)
    }
  ]

  const refetch = () => {
    setBooks(
      getBooks({
        search: query
      })
    )
  }

  const handleBookSelected = (book) => {
    setSelectedBook(book)
    setShowBookDetail(true)
  }

  const handleBookEdit = () => {
    setShowBookDetail(false)
    setShowEditBook(true)
  }

  const handleBookDeleted = (bookID: string) => {
    try {
      deleteBook({
        bookID
      })
      setShowBookDetail(false)
      refetch()
    } catch (error) {
      setError(error.message)
    }
  }

  const handleLoan = (book) => {
    try {
      loanBook({
        bookID: book.id
      })
      setBooks(
        getBooks({
          search: query
        })
      )
      setShowBookDetail(false)
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(refetch, [query])

  return (
    <div>
      <Head>
        <title>Books</title>
      </Head>

      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item, itemIdx) =>
                        itemIdx === 0 ? (
                          <Fragment key={item}>
                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                            <a
                              href="#"
                              className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                              {item}
                            </a>
                          </Fragment>
                        ) : (
                          <a
                            key={item}
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          >
                            {item}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <div className="flex items-center">
                      {showSearchBox && (
                        <div className="col-span-6 sm:col-span-3 search-box">
                          <input
                            type="text"
                            name="search"
                            id="search-box"
                            value={query}
                            onChange={(e) => setQuery(e.currentTarget.value)}
                            autoComplete="search"
                            placeholder="Search for book titles"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      )}
                      <div className="flex search-icon-container">
                        <a
                          className="p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setShowSearchBox(!showSearchBox)}
                        >
                          <span className="sr-only">Search</span>
                          <SearchIcon className="w-6 h-6" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                    <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={user?.avatar}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {profile.map((item) => (
                                <Menu.Item key={item}>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                              <Menu.Item>
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm text-gray-700"
                                >
                                  Sign out
                                </a>
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item, itemIdx) =>
                  itemIdx === 0 ? (
                    <Fragment key={item}>
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <a
                        href="#"
                        className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        {item}
                      </a>
                    </Fragment>
                  ) : (
                    <a
                      key={item}
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.avatar}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user?.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user?.email}
                    </div>
                  </div>
                  <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {profile.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {item}
                    </a>
                  ))}
                  <a
                    href="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="py-6 px-4 sm:px-6 lg:px-8 flex">
            <h1 className="text-3xl font-bold text-gray-900">Books</h1>
          </div>
          <div className="py-6 px-4 sm:px-6 lg:px-8 flex">
            <button
              type="button"
              onClick={() => setShowCreateBook(true)}
              className="ml-3 w-full bg-indigo-600 border border-transparent rounded-md py-1 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              New
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-5">
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {books?.map((book) => (
                  <BookSpot
                    key={book.id}
                    book={book}
                    handleBookSelected={handleBookSelected}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>

      <SlideOver
        open={showBookDetail}
        setOpen={setShowBookDetail}
        title={selectedBook?.name}
        menuOptions={bookDetailMenuOptions}
      >
        <>
          <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <img
              src={selectedBook?.image}
              alt={selectedBook?.name}
              className="w-full h-full object-center object-cover lg:w-full lg:h-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <a>{selectedBook?.name}</a>
              </h3>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {selectedBook?.price}
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleLoan(selectedBook)}
            className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Loan
          </button>
        </>
      </SlideOver>

      <SlideOver
        open={showCreateBook}
        setOpen={setShowCreateBook}
        title="Create a new book"
      >
        <BookCreateForm
          onClose={() => {
            setShowCreateBook(false)
            refetch()
          }}
          setError={setError}
        />
      </SlideOver>

      <SlideOver
        open={showEditBook}
        setOpen={setShowEditBook}
        title={`Editing ${selectedBook?.name}`}
      >
        <BookEditForm
          book={selectedBook}
          onClose={() => {
            setShowEditBook(false)
            refetch()
          }}
          setError={setError}
        />
      </SlideOver>
      <ErrorModal error={error} setError={setError} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { [AUTH_TOKEN_NAME]: token } = parseCookies(ctx)

  const defaultBooks = getBooks({
    search: ''
  })

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      defaultBooks
    }
  }
}
