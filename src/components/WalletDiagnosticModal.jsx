import { AnimatePresence, motion } from "framer-motion";


const WalletDiagnosticModal = ({ isOpen, setIsOpen, client }) => {
  return (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="bg-slate-900/20 backdrop-blur p-2 sm:p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
            >
                <motion.div
                    initial={{ scale: 0, rotate: "12.5deg" }}
                    animate={{ scale: 1, rotate: "0deg" }}
                    exit={{ scale: 0, rotate: "0deg" }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-black text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative "
                >
                    {client && (
                        <div>
                            <p>Account: {client.account.slice(0, 5) + '...' + client.account.slice(38, 42)}</p>
                            <p>Chain ID: {client.chainId}</p>
                            {/* We can display whatever other info we need here */}
                        </div>
                    )}
                </motion.div>

            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default WalletDiagnosticModal