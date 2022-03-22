import { v4 as uuid } from 'uuid'
import { parseCookies } from 'nookies'

import json from '../data/books.json'
import Helper from '../helpers'
import { BOOKS_JSON, Book, GetBooksInput, CreateBookInput, EditBookInput, DeleteBookInput } from '../data/types'

const getActiveData = (): Book[] => {
  const { [BOOKS_JSON]: books } = parseCookies()
  return (books ? JSON.parse(books) : json) as Book[]
}

export const getBooks = ({ search }: GetBooksInput): Book[] => {
  const books = getActiveData()
  return books.filter(book => (book.name.toLowerCase()).includes(search.toLowerCase()))
}

export const createBook = ({ name, image }: CreateBookInput): Book => {
  const books = getActiveData()
  const newBook = {
    id: uuid(),
    name,
    image,
    loaned: false
  } as Book

  Helper.writeToFile(JSON.stringify([
    ...books,
    newBook
  ]))
  return newBook
}

export const editBook = ({ bookID, name, image, loaned }: EditBookInput): Book => {
  const books = getActiveData()
  const oldBookData = books.find(book => book.id === bookID)
  const oldJsonData = books.filter(book => book.id !== bookID)

  if (!oldBookData) throw Error("Book not found")
  if (oldBookData.loaned && (oldBookData.name !== name || oldBookData.image !== image)) throw Error("Can't update a loaned Book")
  const editedBook = {
    ...oldBookData,
    name,
    image,
    loaned
  } as Book
  // overwrite books json
  Helper.writeToFile(JSON.stringify([
    ...oldJsonData,
    editedBook
  ]))

  return editedBook
}

export const loanBook = ({ bookID }: EditBookInput): Book => {
  const books = getActiveData()
  const oldBookData = books.find(book => book.id === bookID)
  const oldJsonData = books.filter(book => book.id !== bookID)

  if (oldBookData.loaned) throw Error("Book already loaned")
  const editedBook = {
    ...oldBookData,
    loaned: true
  } as Book
  // overwrite books json
  Helper.writeToFile(JSON.stringify([
    ...oldJsonData,
    editedBook
  ]))

  return editedBook
}

export const deleteBook = ({ bookID }: DeleteBookInput): Book[] => {
  const books = getActiveData()
  const oldBookData = books.find(book => book.id === bookID)

  if (!oldBookData) throw Error("Book not found")
  if (oldBookData.loaned) throw Error("Can't delete a loaned Book")

  const oldJsonData = books.filter(book => book.id !== bookID)

  // overwrite books json
  Helper.writeToFile(JSON.stringify([
    ...oldJsonData
  ]))

  return oldJsonData
}