var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());
var Genre = require('./models/genre.js');
var Book = require('./models/book.js');
//connect mongoose

mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/', function(req,res){
	res.send("Please use /api/books or / api/genres");
});

app.get('/api/genres', function(req,res){
	Genre.getGenres(function(err, genres){
		if(err){
			throw err;
		} else{
			res.json(genres);
		}
	});
});

app.get('/api/books', function(req,res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		} else{
			res.json(books);
		}
	});
});

app.get('/api/book/:id', function(req,res){
	console.log(req.params.id);
	Book.getBookById(req.params.id, function(err, book){
		if(err){
			throw err;
		} else{
			res.json(book);
		}
	});
});

app.post('/api/genres', function(req,res){
	var genre = req.body;
	Genre.addGenre(genre, function(err, genre){
		if(err){
			throw err;
		} else{
			res.json(genre);
		}
	});
});

app.post('/api/books', function(req,res){
	var book = req.body;
	Book.addBook(book, function(err, book){
		if(err){
			throw err;
		} else{
			res.json(book);
		}
	});
});

app.put('/api/genres/:_id', function(req,res){
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre,{}, function(err, genre){
		if(err){
			throw err;
		} else{
			res.json(genre);
		}
	});
});

app.put('/api/books/:_id', function(req,res){
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book,{}, function(err, book){
		if(err){
			throw err;
		} else{
			res.json(book);
		}
	});
});

app.delete('/api/genres/:_id', function(req,res){
	var id = req.params._id;
	Genre.removeGenre(id, function(err, genre){
		if(err){
			throw err;
		} else{
			res.json(genre);
		}
	});
});

app.delete('/api/books/:_id', function(req,res){
	var id = req.params._id;
	Book.removeBook(id, function(err, book){
		if(err){
			throw err;
		} else{
			res.json(book);
		}
	});
});

app.listen(3000);
console.log("Server running on port 3000");
