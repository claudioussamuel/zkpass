'use client'
import BackgroundContainer from '@/components/BackgroundContainer'
import TextBlock from '@/components/TextBlock'
import TeamCard from '@/components/TeamCard'
import TransgateConnect from '@zkpass/transgate-js-sdk'
import Review from '@/components/Review'
import { useState } from 'react'
import VerifyModal from '@/components/ui/VerifyModal'
import Web3 from "web3";


export default function Home() {
  const [showModal,setShowModal]=useState(false)
  const [result,setResult]=useState<any>()
  const openModal= ()=>setShowModal(true)
  const closeModal=()=>setShowModal(false)
  const verify = async () => {
    try {

      const web3 = new Web3();
       const EVMTaskAllocator = "0x19a567b3b212a5b35bA0E3B600FbEd5c2eE9083d";
      // The appid of the project created in dev center
      const appid = "3fa37c49-63c0-48ef-a430-24acc477e8c8"
  
      // Create the connector instance
      const connector = new TransgateConnect(appid)
  
      // Check if the TransGate extension is installed
      // If it returns false, please prompt to install it from chrome web store
      const isAvailable = await connector.isTransgateAvailable()
  
      if (isAvailable) {
        // The schema id of the project
        const schemaId = "610b315d54624994bd8d90c567d73451"
  
        // Launch the process of verification
        // This method can be invoked in a loop when dealing with multiple schemas
        const res : any= await connector.launch(schemaId)
        
   
        // verifiy the res onchain/offchain based on the requirement     
      
        


        try {
          const { taskId, uHash, publicFieldsHash, recipient, validatorAddress, allocatorSignature, validatorSignature } = result;
          
      // Step 1: Verify Allocator Signature
          const taskIdHex = Web3.utils.stringToHex(taskId);
          const schemaIdHex = Web3.utils.stringToHex(schemaId);
          const allocatorParams = web3.eth.abi.encodeParameters(
            ["bytes32", "bytes32", "address"],
            [taskIdHex, schemaIdHex, validatorAddress]
          );
          const allocatorParamsHash = Web3.utils.soliditySha3(allocatorParams);
          const signedAllocatorAddress = web3.eth.accounts.recover(allocatorParamsHash!, allocatorSignature);
          const isAllocatorValid = signedAllocatorAddress === EVMTaskAllocator;
          console.log(`Allocator Signature Valid: ${isAllocatorValid}`);
         
       // Step 2: Verify Validator Signature
          const validatorParams = web3.eth.abi.encodeParameters(
            ["bytes32", "bytes32", "bytes32", "bytes32"],
            [taskIdHex, schemaIdHex, uHash, publicFieldsHash]
          );
          const validatorParamsHash = Web3.utils.soliditySha3(validatorParams);
          const signedValidatorAddress = web3.eth.accounts.recover(validatorParamsHash!, validatorSignature);
          const isValidatorValid = signedValidatorAddress === validatorAddress;
          console.log(`
      Validator Signature Valid: ${isValidatorValid}`);
      setResult(res)
        } catch (error) {
          console.error("Verification failed", error);
        }

      } else {
        console.log('Please install TransGate')
      }
    } catch (error) {
      console.log('transgate error', error)
    }
  } 
  return (
    <main >
    <BackgroundContainer>
      <TextBlock 
      header='Destributor  Verification'
      subHeader='We Use ZKPass to verify if you are a destributor on ebefa.com'
      />
     {/* <FeaturedCards/> */}
   <button
   onClick={verify}
   className='bg-red-600 p-6 text-2xl cursor-pointer z-50 rounded-md text-white'
   type='submit'
   >Verify Acccount</button>
     {result &&<VerifyModal closeModal={closeModal}/>}
          <TextBlock 
      header='Our Team'
      subHeader='The Best Engineers in the world'
      />
     <TeamCard/>
     <TextBlock 
header='Customers'
subHeader='What our Customers are saying'
/>
<Review />
    </BackgroundContainer>
    </main>
  )
}
