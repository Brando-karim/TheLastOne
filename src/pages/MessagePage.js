import { useSelector } from "react-redux";

export default function MessagePage() {
    const theme = useSelector(state => state.preferences.theme);

    const styles = {
        backgroundImage: "url('Image.png')",
        backgroundSize: "cover",
        padding: "24px"
    };

    return(
        <div>
            <main id="Main" style={styles}>
                <h1 align="center" className={"mb-4 text-" + theme}>Envoyer message</h1>
                <form action="" >
                    <div className="d-flex  w-100 justify-content-center">
                        <input type="text" name="nom" placeholder="Name" className="form-control w-25 me-2 " /> 
                        <input type="email" name="Email" placeholder="Email" className="form-control w-25  ms-2 "/> 
                    </div> <br/>
                    <div className="d-flex justify-content-center w-100" >
                        <input type="text" name="Phone" placeholder="Phone Number" className="form-control  w-50 "  /> 
                    </div><br/>
                    <div className="d-flex justify-content-center w-100" >
                        <textarea name="Msg" id="Msg" placeholder="Message" className="form-control w-50 "  style={{height:'300px',}}></textarea> 
                    </div> <br/>
                    <div className="d-flex justify-content-center " id="hbt" >
                        <input type="button" value="Submit" className={"btn w-25 hover:bg-green-700 px-4 py-2 btn-" + theme} id="sub" />
                    </div>
                </form>
            </main>
        </div>
    )
}
