import { MdSearch } from "react-icons/md";
import "./search.css"

const Search = ({placeholder}) => {
  return (
    <div className='search-container'>
    <MdSearch />
    <input type='text'
    placeholder={placeholder}
    className='search-input' />
</div>
  )
}

export default Search