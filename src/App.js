import axios from "axios";
import './App.css';

import { useState, useEffect, useRef } from 'react';

function App() {
  const [query, setQuery] = useState();
  const [results, setResults] = useState([]);
  const inputRef = useRef();

  const stackoverflow_api_base = "https://api.stackexchange.com/2.3";
  const stackoverflow_api_seacrh = stackoverflow_api_base + "/search";

  const handleSearch = async () => {
    setQuery(inputRef.current.value);
    const searchResults = await axios.get(stackoverflow_api_seacrh, {
      params: {
        order: "desc",
        sort: "activity",
        intitle: inputRef.current.value,
        site: "stackoverflow",
      }
    });
    console.log(searchResults.data.items)
    setResults(prev => searchResults.data.items);
  }

  return (
    <div class="container">
      <div class="row">
        <div class="col-10 left-side-sidebar">
          <div class="col-8 mb-3 d-flex flex-row">
            <input ref={inputRef} type="text" placeholder="search..." maxlength="100" class="form-control" name="name" id="name" />
            <button class="btn btn-primary" onClick={() => handleSearch()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>

          <div class="clearfix mt-40">
            <ul class="xsearch-items">

              {
                results == null ?
                  <></>
                  :
                  results.map((r, i) => (
                    <li class="search-item">
                      <div class="search-item-img">
                        <a href={r.owner.link}>
                          <img src={r.owner.profile_image} width="70" height="70" alt="profile" />
                        </a>
                      </div>
                      <div class="search-item-content">
                        <h3 class="search-item-caption"><a href={r.link}>{r.title}</a></h3>

                        <div class="search-item-meta mb-15">
                          <ul class="list-inline">
                            <li class="time">November 10, 2017</li>
                            <li>{r.answer_count} Answers</li>
                            <li class="pr-0">in</li>
                            <li class="pl-0">
                              {r.tags.map((t,i) => (<span>{t} </span>))}
                            </li>
                          </ul>
                        </div>
                        <div>
                          Illustration by Julian Burford. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam massa quis mauris sollicitudin commodo venenatis ligula commodo. Sed blandit convallis dignissim. Pellentesque pharetra velit eu velit elementum et convallis erat vulputate.
                        </div>
                      </div>
                    </li>
                  ))
              }


            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
