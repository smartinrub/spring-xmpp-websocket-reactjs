package com.sergiomartinrubio.springxmppwebsocketsecurity.service;

import com.sergiomartinrubio.springxmppwebsocketsecurity.repository.AccountRepository;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    public Optional<Account> getAccount(String username) {
        return accountRepository.findById(username);
    }

    public void saveAccount(Account account) {
        accountRepository.save(account);
    }
}
