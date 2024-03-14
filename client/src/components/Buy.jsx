import { ethers } from "ethers";
import "./Buy.css";
const Buy = ({ state }) => {

    const buyChai = async (event) => {
        event.preventDefault();
        const { contract } = state;
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;
        // const amount = document.querySelector("#amount").value;
        const amount = { value: ethers.utils.parseEther("0.0000001") } // ethers.utils.parseEther()将以太币单位从以太（Ether）转换为最小单位的 Wei,需要以字符串传递
        const transsction = await contract.buyChai(name, message, amount);
        await transsction.wait();
        console.log(name, message);
        alert("transaction is successful");
        window.location.reload();
    }

    return (
        <div className="center">
            <h1>Thanks</h1>
            <form onSubmit={buyChai}>
                <div className="inputbox">
                    <input type="text" required="required" id="name" />
                    <span>Name</span>
                </div>
                <div className="inputbox">
                    <input type="text" required="required" id="message" />
                    <span>Message</span>
                </div>
                <div className="inputbox">
                    <input type="submit" value="Pay" disabled={!state.contract} />
                </div>
            </form>

        </div>
    )
}

export default Buy;