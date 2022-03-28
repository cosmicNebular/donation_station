import React, {MouseEventHandler} from "react";
import { useState } from "react";
import { createCampaign } from "../solana";

interface FormProps {
    setRoute: React.Dispatch<React.SetStateAction<number>>;
}

const Form: React.FC<FormProps> = ({setRoute}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImageLink] = useState('')

    const onSubmit = async (e: Event) => {
        e.preventDefault();
        await createCampaign(name, description, image);
        setRoute(0);
    }

    return (
        <form className="ui form">
            <div className="field">
                <label>Title</label>
                <input type="text" name="title" placeholder="Title" onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="field">
                <label>Description</label>
                <input type="text" name="description" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="field">
                <label>Image Link</label>
                <input type="text" name="imageLink" placeholder="imageLink" onChange={(e) => setImageLink(e.target.value)} />
            </div>
            <button className="ui button" type="submit" onClick={onSubmit as unknown as MouseEventHandler<HTMLButtonElement>} >Submit</button>
        </form>
    );
}

export default Form;