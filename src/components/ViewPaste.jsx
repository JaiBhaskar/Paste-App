import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPaste } from "../redux/pasteSlice";
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from "react-router-dom";

const ViewPage = () => {
  const {id} = useParams();

  const allPastes=useSelector((state)=> state.paste.pastes);

  const paste= allPastes.filter((p)=>p._id===id)[0];
  console.log("Final Paste:",paste);
  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1 rounded-2xl mt-2 bg-gray-900 w-[61%] pl-5"
          type="text"
          placeholder="Enter title here"
          value={paste?.title || ""}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* <button onClick={createPost} className="p-2 rounded-2xl mt-2">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button> I DONT NEED BUTTON HERE AS I AM VIEWING ONLY*/}
      </div>
      <div className="mt-8 ">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4 bg-gray-900"
          value={paste?.content || ""}
          placeholder="enter content here"
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        ></textarea>
      </div>
    </div>
  )
}

export default ViewPage
