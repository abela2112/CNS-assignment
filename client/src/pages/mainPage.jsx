import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserContext } from "../userContextProvider"
import Header from "../component/header"


export default function MainPage() {
    const [selectedOptionEncrypt, setSelectedOptionEncrypt] = useState('AES')
    const [selectedOptionDecrypt, setSelectedOptionDecrypt] = useState('AES')
    const [result, setResult] = useState('')
    const [plainText, setPlaintext] = useState('')
    const [cipherText, setCipherText] = useState('')
    const [secretkey, setSecretkey] = useState('')
    const { setUser, user, ready } = useContext(UserContext)

    async function encrypt(ev) {
        ev.preventDefault()

        console.log(selectedOptionEncrypt)
        try {
            if (selectedOptionEncrypt === 'ONE-TIME-PAD' && plainText.length !== secretkey.length) {
                alert('please make sure that you have equal length of key and plain text');
            }
            else {
                const { data: { encryptedData } } = await axios.post(`/api/encriptions/${selectedOptionEncrypt}`, { plainText, secretkey })
                setResult(encryptedData)
            }
        } catch (error) {
            console.error(error)
        }


    }

    async function decrypt(ev) {
        ev.preventDefault()
        try {

            const { data: { plainText } } = await axios.post(`/api/decriptions/${selectedOptionDecrypt}`, {
                cipherText, secretkey
            })
            setResult(plainText)
        } catch (error) {
            console.error(error)

        }
        //console.log(response)
    }
    if (!user && !ready) {
        throw new Error('please login first')
    }

    return (
        <div className=" ">
            <Header user={user} />
            <form className="" >
                <div className=" mx-auto max-w-lg mt-3 grid border p-4 shadow rounded-2xl">
                    <div className="max-w-lg">
                        <h2 className="text-2xl text-center ">Encription</h2>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="plaintext">enter text to encripted</label>
                            <input type="text" className="border w-full rounded-2xl p-2" value={plainText} onChange={(ev) => setPlaintext(ev.target.value)} name="plaintext" id="plaintext" />
                            {/* <textarea className="border w-full"></textarea> */}
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <div>
                                <label htmlFor="secret-key">Enter secret key</label>
                                <input type="text" value={secretkey} onChange={(ev) => setSecretkey(ev.target.value)} name="secret key" id="secret-key" className="p-2 border" />
                            </div>
                            <div className="flex my-2 justify-between gap-2 items-center">
                                <select className="border-0 p-2 cursor-pointer rounded-2xl drop-shadow-md  w-72 duration-300 hover:bg-indigo-100"
                                    value={selectedOptionEncrypt} onChange={(ev) => setSelectedOptionEncrypt(ev.target.value)}>
                                    <option value="ONE-TIME-PAD">ONE-TIME-PAD</option>
                                    <option value="3DES">3DES</option>
                                    <option value="AES">AES</option>
                                </select>

                            </div>
                            <div>
                                <button onClick={encrypt} className=" bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                       px-4 py-3 mt-6">Encript</button>
                            </div>
                        </div>
                    </div>

                    <div className=" max-w-lg p-2">
                        <h2 className="text-2xl text-center">Decription</h2>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="cipherText">enter text to Decripted</label>
                            <input type="text" className="border w-full rounded-2xl p-2" value={cipherText} onChange={(ev) => setCipherText(ev.target.value)} name="ciphertext" id="cipherText" />

                        </div>
                        <div className="flex my-2 justify-between gap-2 items-center">
                            <select className="border-0 p-2 cursor-pointer rounded-2xl drop-shadow-md  w-72 duration-300 hover:bg-indigo-100"
                                value={selectedOptionDecrypt} onChange={(ev) => setSelectedOptionDecrypt(ev.target.value)}>
                                <option value="ONE-TIME-PAD">ONE-TIME-PAD</option>
                                <option value="3DES">3DES</option>
                                <option value="AES">AES</option>
                            </select>
                            <button onClick={decrypt} className="bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                        px-4 py-3 mt-6">Decript</button>

                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl">result</h2>
                        <textarea value={result} onChange={(ev) => { setResult(ev.target.value) }} className="w-full border p-4 h-32"></textarea>
                    </div>
                </div>

            </form >

        </div >
    )
}