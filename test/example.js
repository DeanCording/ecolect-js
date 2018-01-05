'use strict';

const util = require('util');

const ecolect = require('../');
const en = require('../language/en');
const any = require('../values/any');
const date = require('../values/date');

const intents = ecolect.intents(en)
	.intent('todo:list')
		.add('show me my todos')
		.done()
  	.intent('todo:create')
  		.value('text', any())
  		.add('add {text}')
  		.add('add {text} to my todo list')
  		.add('add {text} to my todo')
  		.done()
 	.intent('todo:deadline')
 		.value('date', date())
// 		.add('show me todos for {date}')
 		.add('show me the todos for {date}')
 		.add('what are the todos for {date}')
 		.done()
	.build();

// Match the intent


intents.match('please show me my todos thanks')
 	.then(results => {
 		console.log('1', util.inspect(results, {breakLength: 100, colors: true, depth: 100}));
 	})
 	.catch(err => {
 		console.log(err);
 	});
//
//  intents.match('please show me my todos')
//   	.then(results => {
//   		console.log('2', util.inspect(results, {breakLength: 100, colors: true, depth: 100}));
//   	})
//   	.catch(err => {
//   		console.log(err);
//   	});
//
  intents.match('show me my todos thanks')
   	.then(results => {
   		console.log('3', util.inspect(results, {breakLength: 100, colors: true, depth: 100}));
   	})
   	.catch(err => {
   		console.log(err);
   	});
//
//  intents.match('show me all my todos')
//  	.then(results => {
//  		console.log('4', util.inspect(results, {breakLength: 100, colors: true, depth: 100}));
//  	})
//  	.catch(err => {
//  		console.log(err);
//  	});
//
//  intents.match('show me all my cats')
//  	.then(results => {
//  		console.log('5', util.inspect(results, {breakLength: 100, colors: true, depth: 100}));
//  	})
//  	.catch(err => {
//  		console.log(err);
//  	});
//
//  intents.match('show me all my cats todos')
//  	.then(results => {
//  		console.log('6', util.inspect(results, {breakLength: 100, colors: true, depth: 100}));
//  	})
//  	.catch(err => {
//  		console.log(err);
//  	});
//
//  intents.match('please add a reminder to feed cats to my todo list')
//  	.then(results => {
//  		console.log('7', util.inspect(results, {breakLength: 100, colors: true, depth: 100}));
//  	})
//  	.catch(err => {
//  		console.log(err);
//  	});

intents.match('please show me the todos for today thanks')
	.then(results => {
		console.log('8', util.inspect(results, {breakLength: 100, colors: true, depth: 100}));
	})
	.catch(err => {
		console.log(err);
	});




// intents.match('show me todos for Friday')
// 	.then(results => {
// 		console.log('8', results);
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	});

// Perform partial matching
//intents.match('add', {
//	partial: true
//})
//	.then(results => {
//		console.log('3', results.best);
//	})
//	.catch(err => {
//		console.log(err);
//	});
