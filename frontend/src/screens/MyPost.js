import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import MyPostList from '../components/MyPostList'
import { AUTH } from '../context/AuthContext'

const MyPost = () => {
  const {data}=useContext(AUTH)
  const [api, setApi] = useState([]);
  const getApi=async()=>{
    const response=await fetch('http://192.168.1.68:8000/blog/userblog', {
      method:'GET',
      headers:{
        Authorization:'Bearer '+ data.token
      }
    })
    const value=await response.json()
    setApi(value.blog)
  }
  useEffect(()=>{
    getApi()
  }, [])
  return (
    <ScrollView>
      {
        api.map((item, index)=>{
          return <MyPostList item={item} getApi={getApi} />
        })
      }
    </ScrollView>
  )
}

export default MyPost