import { useForm } from "react-hook-form";

export default function BlogEntryForm({ createEntry,modifyEntry,closeForm, entry = null }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: entry?.title ?? "",
      text: entry?.text ?? "",
    }
  });

  const onSubmit = (data) => {
    console.log(data)

//    if(entry){
//        modifyEntry(entry.id)        
//    } else{
//        createEntry(data)
//    }
  
  }

  const handleCloseMenu = () => {
    if(entry){
      closeForm('modifyForm')
    }
    else{
      closeForm('newEntryForm')
    }

  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-7 rounded flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-lg">Title</label>
        <input
          className="border border-gray-200 rounded p-2 "
          {...register("title", { required: "Title is required" })}
          placeholder="Enter a title..."
        />
        {errors.title && <span>{errors.title.message}</span>}
      </div>

      <div className="flex flex-col gap-2" >
        <label className="font-semibold text-lg">Text</label>
        <textarea
          className="border border-gray-200 rounded p-2"
          {...register("text", { required: "Text is required" })}
          placeholder="Write your entry..."
          rows={5}
        />
        {errors.text && <span>{errors.text.message}</span>}
      </div>

      <div className="flex gap-2">
        <button className=" bg-black rounded text-white text-lg hover:bg-amber-500 cursor-pointer px-4 py-2" type="submit">{entry ? "Save changes" : "Create entry"}</button>
        <button className="text-lg cursor-pointer hover:text-amber-500" onClick={handleCloseMenu}>Close</button>
      </div>
      
    </form>
  );
}