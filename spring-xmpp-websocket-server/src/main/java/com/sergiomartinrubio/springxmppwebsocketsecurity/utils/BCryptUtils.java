package com.sergiomartinrubio.springxmppwebsocketsecurity.utils;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class BCryptUtils {

    public static String hash(String plainTextPassword){
        return BCrypt.hashpw(plainTextPassword, BCrypt.gensalt());
    }

    public static boolean isMatch(String plainTextPassword, String hashedPassword) {
       return BCrypt.checkpw(plainTextPassword, hashedPassword);
    }

}
