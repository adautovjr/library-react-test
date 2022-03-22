import { FC, Fragment } from 'react'
import { Menu, Transition, Dialog } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { DotsVerticalIcon } from '@heroicons/react/solid'

import { classNames } from '../helpers/class-names-helper'
import { MenuOption } from '../data/types'

interface SlideOverProps {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  children: JSX.Element
  menuOptions?: MenuOption[] | undefined
}

const SlideOver = ({
  open,
  setOpen,
  title,
  children,
  menuOptions
}: SlideOverProps) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto relative w-screen max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="flex justify-between items-center px-4 sm:px-6">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      {' '}
                      {title}{' '}
                    </Dialog.Title>
                    {menuOptions && (
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <Menu.Button className="group flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 p-2">
                          <DotsVerticalIcon
                            className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        </Menu.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none menu-options">
                            <div className="py-1">
                              {menuOptions.map((option) => (
                                <Menu.Item key={option.name}>
                                  {({ active }) => (
                                    <a
                                      onClick={option.handleClick}
                                      className={classNames(
                                        option.current
                                          ? 'font-medium text-gray-900'
                                          : 'text-gray-500',
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm'
                                      )}
                                    >
                                      {option.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    )}
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* Replace with your content */}
                    <div className="absolute inset-0 px-4 sm:px-6">
                      <div
                        className="h-full border-2 border-dashed border-gray-200 p-5"
                        aria-hidden="true"
                      >
                        {children}
                      </div>
                    </div>
                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SlideOver
