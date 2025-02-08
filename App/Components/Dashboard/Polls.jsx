import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import * as Progress from "react-native-progress";

const Polls = () => {
  const [polls, setPolls] = useState([
    {
      id: "1",
      question: "Which framework do you prefer?",
      options: [
        { id: "opt1", text: "React", votes: 10 },
        { id: "opt2", text: "Vue", votes: 5 },
        { id: "opt3", text: "Angular", votes: 8 },
      ],
      selectedOption: null,
    },
  ]);

  const votePoll = (pollId, optionId) => {
    setPolls((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll.id === pollId) {
          return {
            ...poll,
            options: poll.options.map((option) =>
              option.id === optionId
                ? { ...option, votes: option.votes + 1 }
                : option
            ),
            selectedOption: optionId,
          };
        }
        return poll;
      })
    );
  };

  const renderPoll = ({ item }) => (
    <View style={styles.pollCard}>
      <Text style={styles.pollQuestion}>{item.question}</Text>

      {item.options.map((option) => {
        const totalVotes = item.options.reduce(
          (sum, opt) => sum + opt.votes,
          0
        );
        const progress = totalVotes > 0 ? option.votes / totalVotes : 0;

        return (
          <TouchableOpacity
            key={option.id}
            style={styles.optionButton}
            onPress={() => votePoll(item.id, option.id)}
            disabled={!!item.selectedOption}
          >
            <Text style={styles.optionText}>
              {option.text} ({option.votes} votes)
            </Text>

            {/* Progress Bar */}
            <Progress.Bar
              progress={progress}
              width={null}
              height={10}
              borderRadius={20}
              color="#C4D9FF"
              unfilledColor="#E0E0E0"
              borderWidth={0}
              style={styles.progressBar}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📊 Polls</Text>
      <FlatList
        data={polls}
        keyExtractor={(item) => item.id}
        renderItem={renderPoll}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default Polls;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    margin: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  pollCard: {
    backgroundColor: "#FFF",
    // padding: 15,
    marginVertical: 10,
    borderRadius: 8,
  },
  pollQuestion: {
    fontSize: 18,
    fontWeight: "bold",
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: "#FFF",
  },
  optionText: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 5,
  },
  progressBar: {
    marginTop: 5,
  },
});
