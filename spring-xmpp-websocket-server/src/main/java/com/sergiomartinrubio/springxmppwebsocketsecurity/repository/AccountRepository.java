package com.sergiomartinrubio.springxmppwebsocketsecurity.repository;

import com.sergiomartinrubio.springxmppwebsocketsecurity.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, String> {
}
