'use strict';

const chai = require('chai');
const expect = chai.expect;

const lang = require('../language/en');
const Builder = require('../resolver/builder');

const enumeration = require('../values/enumeration');

describe('Value: Enumeration', function() {
	describe('No mapping', function() {
		const resolver = new Builder(lang)
			.value('company', enumeration([ 'Balloons', 'Cookie Co', 'Banana Inc' ]))
			.add('{company} orders')
			.add('orders for {company}')
			.build();

		it('Invalid company', function() {
			return resolver.match('orders for ABC')
				.then(results => {
					expect(results.matches.length).to.equal(0);
				});
		});

		it('Single token company', function() {
			return resolver.match('orders for Ballons')
				.then(results => {
					expect(results.matches.length).to.equal(1);
					expect(results.best.values.company).to.equal('Balloons');
				});
		});

		it('Multi token company', function() {
			return resolver.match('orders for Cookie Co')
				.then(results => {
					expect(results.matches.length).to.equal(1);
					expect(results.best.values.company).to.equal('Cookie Co');
				});
		});
	});

	describe('Mapping', function() {
		const resolver = new Builder(lang)
			.value('company', enumeration([
				{ name: 'Balloons' },
				{ name: 'Cookie Co' },
				{ name: 'Banana Inc' }
			], v => v.name))
			.add('{company} orders')
			.add('orders for {company}')
			.build();

		it('Invalid company', function() {
			return resolver.match('orders for ABC')
				.then(results => {
					expect(results.matches.length).to.equal(0);
				});
		});

		it('Single token company', function() {
			return resolver.match('orders for Ballons')
				.then(results => {
					expect(results.matches.length).to.equal(1);
					expect(results.best.values.company).to.deep.equal({
						name: 'Balloons'
					});
				});
		});

		it('Multi token company', function() {
			return resolver.match('orders for Cookie Co')
				.then(results => {
					expect(results.matches.length).to.equal(1);
					expect(results.best.values.company).to.deep.equal({
						name: 'Cookie Co'
					});
				});
		});
	});

	describe('Partial matching', function() {
		const resolver = new Builder(lang)
			.value('company', enumeration([ 'Balloons', 'Cookie Co', 'Banana Inc' ]))
			.add('{company} orders')
			.add('orders for {company}')
			.build();

		it('Invalid company', function() {
			return resolver.match('orders for A', {
				partial: true
			})
				.then(results => {
					expect(results.matches.length).to.equal(0);
				});
		});

		it('One match', function() {
			return resolver.match('orders for C', {
				partial: true
			})
				.then(results => {
					expect(results.matches.length).to.equal(1);
					expect(results.best.values.company).to.equal('Cookie Co');

					const expr = results.best.expression;
					expect(expr[expr.length - 1]).to.deep.equal({
						type: 'value',
						id: 'company',
						value: 'Cookie Co'
					});
				});
		});

		it('Multiple matches', function() {
			return resolver.match('orders for B', {
				partial: true
			})
				.then(results => {
					expect(results.matches.length).to.equal(2);
				});
		});
	});
})
