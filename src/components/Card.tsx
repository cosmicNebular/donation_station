import React, { useState } from "react";
import { donateToCampaign, getAllCampaigns, withdraw } from "../solana";
import {PublicKey} from "@solana/web3.js";

interface CardProps {
    data: CardData;
    setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
}

const Card: React.FC<CardProps> = ({ data, setCards }) => {
    const [amount, setAmount] = useState(0);
    const onDonate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await donateToCampaign(data.id as unknown as PublicKey, amount);
        let newCards = await getAllCampaigns();
        setCards(newCards);
    }
    const onWithdraw = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await withdraw(data.id as unknown as PublicKey, amount);
            alert('Withdraw successful!');
        } catch (e) {
            console.log(e);
            alert("only admin can withdraw");
        }
        let newCards = await getAllCampaigns();
        setCards(newCards);

    }
    return (
        <div>
            <div className="ui card fluid">
                <div className="image">
                    <img src={data.image} />
                </div>
                <div className="content">
                    <div className="header">{data.title}</div>

                    <div>
                        <span>Raised: {data.amount}</span>
                    </div>
                    <p>{data.description}</p>

                    <form className="ui form container">
                        <div className="ui grid">
                            <div className="row">
                                <div className="column thirteen wide">
                                    <div className="field">
                                        <input type="text" name="amount" placeholder="Amount to donate" onChange={(e) => setAmount(e.target.value as unknown as number)} />
                                    </div>
                                </div>
                                <div className="column">
                                    <button className="ui button" type="submit" onClick={(e) => onDonate(e)} >Donate</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div>Only admin can withdraw </div>
                    <form className="ui form container">
                        <div className="ui grid">
                            <div className="row">
                                <div className="column thirteen wide">
                                    <div className="field">
                                        <input type="text" name="amount" placeholder="Amount to withdraw" onChange={(e) => setAmount(e.target.value as unknown as number)} />
                                    </div>
                                </div>
                                <div className="column">
                                    <button className="ui button" type="submit" onClick={(e) => onWithdraw(e)} >Withdraw</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Card;