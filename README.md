# Blogging system
<h2>Installation</h2>
Open your terminal and clone the project
<pre>git clone https://github.com/slavi-galabov/React-bloging-system.git</pre>
go to project folder and run <code>npm i</code> to install all dependencies.
Run <code>npm start</code> to start the project
<p>You can see users and passwords in <code>/src/config.json</code></p>
<h2>Task Description</h2>
<p>The system should allow the users to login to the blog. After authentication users are relocated to the “posts page”. In the post page they can view all posts, create new posts, edit their own posts, delete posts (administrators only). A user can click on a post and go to the “post page”. In the post page a user can view all comments about the post and create new comments. In the same page the user can “like” the post.</p>
<p>There are two types of users in the system - normal users and administrators. Normal users can create new posts, edit their own posts, like posts (only posts that are not created by the user) and comment posts. Administrators can only delete and view posts. </p>

<h2>Requirements Specification</h2>
Entities:
<ul>
    <li>Post  - Consists of text and a title. Posts can be created, edited, deleted, liked and commented.</li>
    <li>Comment - a comment about a post. It consist of a text only. The username of the user who created the comment should be displayed alongside with the comment text and the date of creation, when visualized. Users can create new comments only. Each post has its own set of comments.</li>
    <li>Like - a post can be liked by a user.</li>
</ul>
Users:
<ul>
    <li>Normal users - Normal users can authenticate to the system, create posts, edit their own posts, like posts that are not created by them and comment posts. Normal users cannot delete posts</li>
    <li>Administrators - Administrators can authenticate to the system and delete and view posts only.</li>
</ul>
Views (Pages)
<ul>
    <li>Login page - a page where the user can authenticate by entering username and password</li>
    <li>All posts page - a page where a user can view all posts, create new posts and edit his own posts. Administrators can delete posts from this page. In this page all posts should be displayed with their title and text, as well as information how many likes each posts has. This page is only accessible by authenticated users.</li>
    <li>Post page - a page where a user can view the post and its comments and also like the post. This page is only accessible by authenticated users.</li>
</ul>


<h2>Functional Requirements:</h2>
<ul>
    <li>Normal users can log to the system by entering username and password.</li>
    <li>Administrators can log to the system by entering username and password.</li>
    <li>Logged users can view “all posts page” and “post page”.</li>
    <li>Users that are not logged cannot access the “all posts page” and the “post page”.</li>
    <li>Normal users and administrators can view all posts and their likes (the likes count) from the “all posts page’</li>
    <li>Normal users and administrators can view a post and its comments in the “post page”.</li>
    <li>Normal users can create new posts from the “all posts page”, by entering post title and post text.</li>
    <li>Normal users can edit only their own posts, by changing the title or / and the text.</li>
    <li>Normal users can like posts that are not created by them from the “post page”.</li>
    <li>Normal users can create new comments by entering a comment text from the “post page”.</li>
    <li>Administrators can delete posts from the “all posts page”</li>
    <li>Comments (when displayed) should indicate the username of the user that has created them and the date of creation.</li>
    <li>Comments should be ordered by their date of creation (More recent posts should appear on the top).</li>
    <li>Each page should have its own url address. For example a user can view a specific post by entering its url in the browser.</li>
</ul>

<h2>Comments</h2>
<ul>
    <li>This is only front-end task so any calls to the back-end server can be stubbed. (For example instead of fetching all posts from the database, the service can look in the web storage to retrieve posts)</li>
    <li>Data about user accounts and their roles can be hardcoded (The data can be stored in objects in the code).</li>
    <li>It is up to the programmer to decide how to store data about the session of the currently logged user and created posts and comments (HTML5 Web Storage is a good idea). </li>
    <li>The implementation of the task will be scored based on the code organisations (how the software design was made and how the code was written). </li>
    <li>The visual representation won’t be scored but any effort invested in the look and feel will be taken into account. </li>
</ul>


