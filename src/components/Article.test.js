import React from 'react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

import { render, screen, waitFor } from '@testing-library/react';

const testArticle = {
	id: '123456',
	headline: 'A test headline',
	createdOn: '2021-08-09T18:02:38-04:00',
	summary: 'A test summary',
	author: 'A test author',
	body: 'This is a bod paragraph'
};

const noAuthor = {
	id: '123456',
	headline: 'A test headline',
	createdOn: '2021-08-09T18:02:38-04:00',
	summary: 'A test summary',
	author: '',
	body: 'This is a bod paragraph'
};

test('renders component without errors', () => {
	render(<Article article={testArticle} />);
});

test('renders headline, author from the article when passed in through props', () => {
	render(<Article article={testArticle} />);

	const headline = screen.queryByText(/A test headline/i);
	const author = screen.queryByText(/A test author/i);

	expect(headline).toBeInTheDocument();
	expect(author).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', () => {
	render(<Article article={noAuthor} />);

	const author = screen.queryByTestId('author');
	expect(author).toHaveTextContent(/Associated Press/i);
});

test('executes handleDelete when the delete button is pressed', async () => {
	const mockHandleDelete = jest.fn();

	render(<Article article={testArticle} handleDelete={mockHandleDelete} />);

	const buttonClick = screen.queryByTestId('deleteButton');
	userEvent.click(buttonClick);

	await waitFor(() => {
		expect(mockHandleDelete).toHaveBeenCalled();
	});
});

//Task List:
//1. Complete all above tests. Create test article data when needed.
