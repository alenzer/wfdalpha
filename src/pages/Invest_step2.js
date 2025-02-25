import { 
  Box, 
  Flex, 
  Input, 
  InputGroup, 
  HStack, 
  InputRightElement, 
  Text
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import React, { useState, useRef, } from 'react';
import { navigate } from '@reach/router'
import { toast } from "react-toastify";

import { ImageTransition, InputTransition } from "../components/ImageTransition";
import { useStore } from '../store';
import Notification from '../components/Notification';
import PageLayout from '../components/PageLayout';
import {ParseParam, errorOption} from '../components/Util';

export default function InvestStep2() {
  const [backAmount, setBackAmount] = useState('');
  const [wfdAmount, setWfdamount] = useState('');
  const {state, dispatch} = useStore();

  //------------parse URL for project id----------------------------
  let project_id = ParseParam();


  function onChangeBackamount(e){
    if(e.target.value != '' && e.target.value != parseInt(e.target.value).toString()){
      toast("Please input number only", errorOption);
      return;
    }
    let wefundRate = state.presale? 0.09: 0.06;
    setWfdamount(parseInt(parseInt(e.target.value)/wefundRate));
    setBackAmount(e.target.value);
  }

  function onNext(){
    dispatch({
      type: 'setInvestamount',
      message: backAmount,
    })
    dispatch({
      type: 'setInvestWfdAmount',
      message: wfdAmount,
    })
    navigate('/invest_step3?project_id=' + project_id);
  }
  return (
    <PageLayout title="Back the Project" subTitle1="Invest" subTitle2="in WeFund">
       <Box 
        width={{base:'100%', sm:'80%', md:'80%', lg:'80%', xl:'70%'}} 
        px='50px' 
        style={{fontFamily:'Sk-Modernist-Regular'}} 
      >
        <Flex mt='83px' justify='center' align='center' direction='column' style={{fontFamily:'PilatExtended-Regular'}}>
          <HStack mt='150px' mb='50px' px='15px'>
            <Box
              width={{base:'50px', md:'40px'}}
              style={{paddingTop: '3px', paddingLeft:'3px',
              height: '24px', border: '3px solid #3BE489',
              backgroundColor: '#3BE489',
              borderRadius: '50%',
              display: 'inline-block'}}>
            <CheckIcon color="#250E3F" w={3} h={3} marginBottom={'20px'}/>
            </Box>
            <Text fontSize={{base:'12px', sm:'16px', md:'22px', lg:'22px'}}>Step 1</Text>
            <Box
              style={{height: '4px',
              width: '30%',
              background: 'linear-gradient(90deg, #3BE489 0%, rgba(59, 228, 137, 0) 100%)'}}>
            </Box>
            <Box
              width={{base:'50px', md:'40px'}}
              style={{height: '24px', border:
              '3px solid rgba(255, 255, 255, 0.3799999952316284)',
              borderRadius: '50%',
              display:'inline-block'}}>
            </Box>
            <Text fontSize={{base:'12px', sm:'16px', md:'22px', lg:'22px'}}>Step 2</Text>
            <Box
              style={{height: '0px',
              width: '30%',
              border: '2px solid rgba(255, 255, 255, 0.3799999952316284)',
              background: ' rgba(255, 255, 255, 0.3799999952316284)'}}>
            </Box>
            <Box
              width={{base:'50px', md:'40px'}}
              style={{height: '24px',
              border: '3px solid rgba(255, 255, 255, 0.3799999952316284)',
              borderRadius: '50%',
              display: 'inline-block'}}>
            </Box>
            <Text fontSize={{base:'12px', sm:'16px', md:'22px', lg:'22px'}}>Final Step</Text>
          </HStack>
          <Text fontSize={{base:'15px', md:'15px', lg:'22px'}} fontWeight={'300'}>
            Input your <span style={{color:'#00A3FF'}}>Investment Amount</span>
          </Text>
          <Text fontSize={{base:'12px', md:'12px', lg:'16x'}} maxW={'390px'} color='rgba(255, 255, 255, 0.54)' fontWeight={'normal'} mt={'20px'} textAlign={'center'}>
            Please enter UST amount and we will convert the WFD amount for you
          </Text>
        </Flex>
        {/* --------amount to back----------- */}
        <Flex direction={{base:'column', md:'column', lg:'column'}} ml={{base:'0px', md:'0px', lg:'0px'}} mt='40px' justify="center" align='center'>
        <Flex>
          <Text mb='20px'>UST amount you want to invest</Text>
        </Flex>
        <InputTransition 
          unitid='backamount'
          selected={backAmount==''?false:true}
          width='300px' height='55px' rounded='md' mb='42px'
        >
          <InputGroup 
            size={{base:'200px', lg:'sm'}}
            style={{border:'0', background: 'rgba(255, 255, 255, 0.05)'}}
          >
            <Input type="text" h='55px' 
              style={{border:'0', background:'transparent', paddingLeft:'25px'}}
              focusBorderColor="purple.800" 
              rounded="md"
              value={backAmount}
              onChange={(e)=>onChangeBackamount(e)}
            />
            <InputRightElement
              w={{base:'40px', lg:'60px'}}
              h='55px'
              pr={{base:'15px', lg:'5px'}}
              pointerEvents='none'
              children={<Text>UST</Text>}
            />
          </InputGroup>
        </InputTransition>
        <Flex>
          <Text mb='20px'>WFD tokens you will receive</Text>
        </Flex>
        <InputTransition
          unitid='WFDamount'
          selected={backAmount==''?false:true}
          width='300px' height='55px' rounded='md'
        >
          <InputGroup 
            size={{base:'200px', lg:'sm'}} 
            style={{border:'0', background: 'rgba(255, 255, 255, 0.05)'}}
          >
            <Input type="text" h='55px'
              style={{border:'0', background:'transparent', paddingLeft:'25px'}}
              focusBorderColor="purple.800"
              rounded="md"
              value={wfdAmount}
              onChange={(e)=>{}}
            />
            <InputRightElement
              w={{base:'40px', lg:'60px'}}
              h='55px'
              pr={{base:'15px', lg:'5px'}}
              pointerEvents='none'
              children={<Text>WFD</Text>}
            />
          </InputGroup>
        </InputTransition>
        </Flex>
        {/* -----------------Back Project----------------- */}
        <Flex w='100%' mt='60px'justify='center' mb='170px'>
          <ImageTransition
            unitid='Invest2invest'
            border1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)' 
            background1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
            border2='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
            background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
            border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
            background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
            selected={false}
            width='200px' height='50px' rounded='33px'
          >
            <Box variant="solid" color="white" justify='center' align='center'
                onClick = {()=>onNext()}>
              Invest
            </Box>
          </ImageTransition>
        </Flex>
      </Box>
    </PageLayout>
  )
}
