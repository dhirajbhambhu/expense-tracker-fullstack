package com.dheeraj.expensetracker.service;
import com.dheeraj.expensetracker.entity.User;
import com.dheeraj.expensetracker.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder,JwtService jwtService){
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder =bCryptPasswordEncoder;
        this.jwtService = jwtService;
    }

    public User register(User user){
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    public String login(String email , String password){
        User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new RuntimeException("Email not found"));
        if(bCryptPasswordEncoder.matches(password, user.getPassword())){
            return jwtService.generateToken(email);
        }
        throw new RuntimeException("Invalid Password");
    }
}
