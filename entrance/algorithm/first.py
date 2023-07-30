class Challenge1:
    def wordGame(self, p: str, reshte: str) -> bool:
        words = reshte.split()

        if len(p) != len(words):
            return False

        pattern_uni = {}
        seen_words = set()

        for i in range(len(p)):
            if p[i] not in pattern_uni:
                if words[i] in seen_words:
                    return False
                pattern_uni[p[i]] = words[i]
                seen_words.add(words[i])
            else:
                if pattern_uni[p[i]] != words[i]:
                    return False

        return True