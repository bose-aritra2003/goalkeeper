'use client';

import { FormEvent, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useModalStore from "@/app/store/ModalStore";
import useBoardStore from "@/app/store/BoardStore";
import TaskTypeRadioGroup from "@/app/components/TaskTypeRadioGroup";
import Image from "next/image";
import { HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";
import toast from "react-hot-toast";

function Modal() {
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);

  const [newTaskInput, newTaskType, setNewTaskInput, image, setImage, addTask] = useBoardStore((state) => [
    state.newTaskInput,
    state.newTaskType,
    state.setNewTaskInput,
    state.image,
    state.setImage,
    state.addTask,
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) {
      return;
    }

    toast.success("Task added successfully");
    addTask(newTaskInput, newTaskType, image)

    setImage(null);
    closeModal();
  }

  const handleUpload = async (result: any) => {
    setImage(result?.info?.secure_url);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        onSubmit={handleSubmit}
        onClose={closeModal}
        as="form"
        className="relative z-10"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-2">
                  Add a Task
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Add a new task . . ."
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                  />
                </div>

                <TaskTypeRadioGroup />

                <div className="mt-2">
                  <button
                    type="button"
                    className="w-full border border-gray-300 rounded-md outline-none p-5 hover:bg-gray-500/10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-150"
                  >
                    <CldUploadButton
                      options={{ maxFiles: 1 }}
                      onUpload={handleUpload}
                      uploadPreset="s16ksfrg"
                    >
                      <HiPhoto className="h-6 w-6 mr-2 inline-block"/>
                      <p>Upload Image</p>
                    </CldUploadButton>
                  </button>

                  {
                    image && (
                      <Image
                        src={image}
                        alt="uploaded image"
                        width={200}
                        height={200}
                        placeholder="blur"
                        blurDataURL="/images/placeholder.webp"
                        className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150"
                        onClick={() => setImage(null)}
                      />
                    )
                  }
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-100 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed transition-all duration-150"
                  >
                    Add Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
export default Modal;