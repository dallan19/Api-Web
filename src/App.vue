<template>
  <div id="app" class="container">
    <div class="row-fluid">
      <form id="form">
        <div class="form-group">
          <label for="contentId">Contenido</label>
          <input type="text" class="form-control" id="contentId" aria-describedby="contentHelp" v-model="tweet.content">
          <small id="contentHelp" class="form-text text-muted">Contenido del articulo.</small>
        </div>
        <div class="form-group">
          <label for="locationId">Ubicación</label>
          <textarea class="form-control" id="locationId"  name="location" v-model="tweet.location"></textarea>
        </div>
        <div class="form-group">
          <label>Author: </label>
          <select name="author" v-model="tweet.author" class="form-control">
            <option v-for="author in authors" :value="author._id" style="">
              <em>{{ author.firstname }} {{ author.lastname }}</em>
            </option>
          </select>
          
          
        </div>
       
        <button type="submit" class="btn btn-primary" @click.prevent="create">Submit</button>
      </form>
    </div>
    

    <hr />
    <p v-if="loading">Loading ...</p>
    <div class="row-fluid" v-else>
      <div class="card bg-light text-dark" v-for="tweet in tweets" :key="tweet._id">
        <div class="card-body"> 
            {{ tweet.content }} - {{ tweet.location }} - {{ tweet.author.firstname }} {{ tweet.author.lastname }}
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import config from "./config.json";

export default {
  name: 'app',
  data () {
    return {
      loading: true,
      tweets: [],
      authors: [],
      tweet: {
        content: '',
        location: '',
        author: ''
      }
    }
  },
  created (){
    this._loadTweets();
    this._loadAuthors();
  },
  methods: {
    _loadTweets(){
      console.log('--------cargando los tweets---------')
      axios.get(`${config.baseURL}/tweets`,{
        withCredentials: true
      })
      .then( response => {
        this.loading = false;
        this.tweets = response.data.data;
      })
    },
    _loadAuthors(){
      axios.get(`${config.baseURL}/users`,{
        withCredentials: true
      })
      .then( response => {
        this.authors = response.data.data;
      })
    },
    create(){
      
      let payload = "";
      Object.keys(this.tweet).forEach(key => {
        payload+=`${key}=${this.tweet[key]}&`
      });
      
      axios.post(`${config.baseURL}/tweets`, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then( response => {
        document.getElementById("form").reset();
        this._loadTweets();
      })
    }
  }
}
</script>