import random
import array
import rsa


MAX_LEN=8
class Password_gen:
    def __init__(self):
        self.key=5
        MAX_LEN=8
        self.DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] 
        self.LOWERCASE_CHARACTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
                             'i', 'j', 'k','l', 'm', 'n', 'o', 'p', 'q',
                             'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
                             'z']
         
        self.UPPERCASE_CHARACTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                             'I', 'J', 'K','L', 'M', 'N', 'O', 'P', 'Q',
                             'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
                             'Z']
         
        self.SYMBOLS = ['@', '#', '$', '%', '=', ':', '?','*']
        self.LIST = self.DIGITS + self.UPPERCASE_CHARACTERS + self.LOWERCASE_CHARACTERS + self.SYMBOLS

    def Generate(self):
        rand_digit = random.choice(self.DIGITS)
        rand_upper = random.choice(self.UPPERCASE_CHARACTERS)
        rand_lower = random.choice(self.LOWERCASE_CHARACTERS)
        rand_symbol = random.choice(self.SYMBOLS)

        temp = rand_digit + rand_upper + rand_lower + rand_symbol

        for i in range(0,MAX_LEN-4):
            temp = temp + random.choice(self.LIST)
            temp_list = array.array('u',temp)
            random.shuffle(temp_list)
            
        self.password=""
        for i in temp_list:
            self.password=self.password+i

        return self.password

    def __crypt(self, char, key):
        """
                 Encrypt single letter, offset
                 @param char: {str} single character
                 @param key: {num} offset
                 @return: {str} Encrypted characters
        """
        if not char.isalpha():
            return char
        else:
            base = "A" if char.isupper() else "a"
            return chr((ord(char) - ord(base) + key) % 26 + ord(base))

    def encrypt(self, char, key):
        """
                 Encrypt character
        """
        return self.__crypt(char, key)

    def decrypt(self, char, key):
        """
                 Decrypt characters
        """
        return self.__crypt(char, -key)

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
p=Password_gen()
print(p.decrypt_text('ceoceo',5))
  
        
     
            

    
