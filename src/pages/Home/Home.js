import React from 'react'
import { connect } from 'react-redux';
import CardList from '../../components/Card-List/Card-List.component';
import Search from '../../components/Search/Search.component';
import { searchMonster } from '../../redux/monster/monster.action';
import './Home.styles.css'


class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            monsters: [],
            
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ monsters: users }));
    }

    handleSearch = (event)=>{
        const{searchField} =this.props
        searchField(event.target.value)
    }
   
    render(){
        
        const {monsters } = this.state
        const {searchName} =this.props
        const filteredMonsters = monsters.filter((monster) => monster.name.toLowerCase().includes(searchName.toLowerCase()))
        return(
            <>
            <div className='App'>
                <h1>Monsters Rolodex</h1>
               
                <Search handleSearch={this.handleSearch} />
                <CardList monsters={filteredMonsters} />
                
            </div>
            </>
        )
    }
}

const mapDispatchToProps=dispatch=>({
    searchField:username=>
    dispatch(searchMonster(username))
})
const mapStateToProps = state=>({
    searchName:state.search.searchField
})

export default connect (mapStateToProps,mapDispatchToProps)(Home)