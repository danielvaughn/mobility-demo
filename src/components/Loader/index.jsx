import { AiOutlineLoading } from 'react-icons/ai'

const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-slate-500">
      <AiOutlineLoading className="animate-spin text-6xl" />
    </div>
  )
}

export default Loader
