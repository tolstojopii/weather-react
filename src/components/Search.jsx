import { useState } from "react"

const Search = (props) => {
    const {
        onSearch,
    } = props

    const [inputValue, setInputValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSearch(inputValue.trim());
            setInputValue('');
        }
    }

    return (
        <div className="search-section">
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="city-input"
              placeholder="Введите город, например: Москва"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button 
            className="search-btn" 
            id="searchButton"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                
              ></svg>
              Поиск
            </button>
          </form>
        </div>
    )
}

export default Search