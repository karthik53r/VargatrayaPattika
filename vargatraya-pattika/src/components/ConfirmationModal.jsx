const ConfirmationModal = ({ message, onConfirm,setShowModal }) => {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="bg-gray-500 bg-opacity-75 fixed inset-0" aria-hidden="true"></div>
            <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg className="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="10" cy="10" r="9" />
                                <line x1="10" y1="16" x2="10" y2="12" />
                                <line x1="10" y1="8" x2="10" y2="8" />
                            </svg>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg font-medium text-gray-900" id="modal-title">
                                {message}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button onClick={onConfirm} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                        Confirm
                    </button>
                    <button onClick={()=>setShowModal(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm">
                        Cancel
                    </button>
                </div>
            </div>
        </div>

    );
};
export default ConfirmationModal;