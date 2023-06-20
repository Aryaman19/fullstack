import React, { useState, useEffect } from "react";
import TweetFactory from "../Components/TweetFactory";
import Tweet from "../Components/Tweet";
import { dbService } from "../firebase";

const Home = ({ user }) => {
	const [tweets, setTweets] = useState([]);

	useEffect(() => {
		dbService
			.collection("nweets")
			.orderBy("createdAt", "desc")
			.onSnapshot((snapshot) => {
				const tweetArray = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setTweets(tweetArray);
			});
	}, []);
	
	return (
		<div className='container'>
			<TweetFactory userObj={user} />
			<div style={{ marginTop: 30, width: "320px" }}>
				{tweets.map((tweet) => (
					<Tweet
						key={tweet.id}
						nweetObj={tweet}
						isOwner={tweet.creatorId === user.uid}
					/>
				))}
			</div>
		</div>
	);
};

export default Home;
