class CaesarCipher(object):
    """
    Caesar encryption and decryption
    """

    # def __crypt(self, char, key):
    #     """
    #              Encrypt single letter, offset
    #              @param char: {str} single character
    #              @param key: {num} offset
    #              @return: {str} Encrypted characters
    #     """
    #     if not char.isalpha():
    #         return char
    #     else:
    #         base = "A" if char.isupper() else "a"
    #         return chr((ord(char) - ord(base) + key) % 26 + ord(base))

    # def encrypt(self, char, key):
    #     """
    #              Encrypt character
    #     """
    #     return self.__crypt(char, key)

    # def decrypt(self, char, key):
    #     """
    #              Decrypt characters
    #     """
    #     return self.__crypt(char, -key)

    def __crypt_text(self, func, text, key):
        """
               Encrypt text
               @param char: {str} text
               @param key: {num} offset
               @return: {str} Encrypted text
       """
        lines = []
        for line in text.split("\n"):
            words = []
            for word in line.split(" "):
                chars = []
                for char in word:
                    chars.append(func(char, key))
                words.append("".join(chars))
            lines.append(" ".join(words))
        return "\n".join(lines)

    def encrypt_text(self, text, key):
        """
                 Encrypt text
        """
        return self.__crypt_text(self.encrypt, text, key)

    def decrypt_text(self, text, key):
        """
                 Decrypt text
        """
        return self.__crypt_text(self.decrypt, text, key)


if __name__ == '__main__':
    plain = """
    you know? I love you!
    """
    key = 3

    cipher = CaesarCipher()

    # 
    print(cipher.encrypt_text(plain, key))
    # brx nqrz? L oryh brx!

    # 
    print(cipher.decrypt_text("brx nqrz? L oryh brx!", key))
    # you know? I love you!