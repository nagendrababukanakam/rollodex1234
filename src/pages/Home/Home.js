import React from 'react'
import { connect } from 'react-redux';
import CardList from '../../components/Card-List/Card-List.component';
import Search from '../../components/Search/Search.component';
import { searchMonster } from '../../redux/monster/monster.action';
import './Home.styles.css'
//component api life cycle methods =>useState = {this.State,seState}
import {useState,useEffect} from 'react'
import axios from 'axios'
import { Container, Row } from 'react-bootstrap';
import {from} from 'react-bootstrap'

const Home = (props)=> {
   //this.state,this.setState
    const [data, setData] = useState([])

    const {searchName} = props

    console.log(data)
    //Component Didmount
    useEffect(async () => {

      const result = await axios('https://jsonplaceholder.typicode.com/users')

      setData(result.data)

    },[])

    const filteredMonsters = data.filter((monster) => monster.name.toLowerCase().includes(searchName.toLowerCase()))

    const handleSearch = (event)=>{

        const {searchField} = props

        searchField(event.target.value)

    }
    return(

    <>
    <Container>
    <div className='App'>

        <Row><h1>Monsters Rolodex</h1></Row>
        <Row><Search handleSearch={handleSearch} /></Row>

        <Row><CardList monsters={filteredMonsters} /></Row>
    </div>
    </Container>

    </>
    )}

const mapDispatchToProps=dispatch=>({
    searchField:username=>
    dispatch(searchMonster(username))
})
const mapStateToProps = state=>({
    searchName:state.search.searchField
})

export default connect (mapStateToProps,mapDispatchToProps)(Home)