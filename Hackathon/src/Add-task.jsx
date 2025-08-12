import Layout from "./components/Layout"
import { DialogBox } from "./components/DialogBox"
import { DataTable } from "./components/DataTable"
const Addtask = () => {
  return (
    <Layout>
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add Task</h1>
            <p className="mb-4">Use the form below to add a new task.</p>
            <DataTable/>   
        </div>
    </Layout>
  )
}

export default Addtask