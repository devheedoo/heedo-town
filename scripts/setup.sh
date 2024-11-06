#!/bin/bash

# Homebrew
if ! command -v brew &>/dev/null; then
  echo "Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
  echo "Homebrew is already installed"
fi

#############
# CLI tools #
#############

## git
brew install git
git config --global user.name "Heedo Kim"
git config --global user.email "devheedoo@gmail.com"

## oh-my-zsh with powerlevel10k
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
if grep -q '^ZSH_THEME=' ~/.zshrc; then
  sed -i '' 's/^ZSH_THEME=.*/ZSH_THEME="powerlevel10k\/powerlevel10k"/' ~/.zshrc
else
  echo 'ZSH_THEME="powerlevel10k/powerlevel10k"' >>~/.zshrc
fi

## nvim
brew install nvim

## LazyVim
mv ~/.config/nvim{,.bak}
git clone https://github.com/LazyVim/starter ~/.config/nvim
rm -rf ~/.config/nvim/.git

## GitHub CLI
brew install gh

## nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
if ! grep -q 'NVM_DIR' ~/.zshrc; then
  echo 'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"' >>~/.zshrc
  echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >>~/.zshrc
fi
source ~/.zshrc
nvm install --lts
nvm alias default lts/*

########
# apps #
########

brew install --cask iterm2
brew install --cask visual-studio-code
brew install --cask slack
brew install --cask google-chrome
brew install --cask figma
brew install --cask notion
brew install --cask rectangle

###############
# development #
###############

brew install -g typescript
brew install -g eslint
brew install -g prettier

################
# mac-specific #
################

## disable special character input on long press
defaults write -g ApplePressAndHoldEnabled -bool false

## key repeat rate: fastest
defaults write -g InitialKeyRepeat -int 15

## delay until repeat: shortest
defaults write -g KeyRepeat -int 2

###########
# aliases #
###########

echo 'alias vi="nvim"' >>~/.zshrc
echo 'alias vim="nvim"' >>~/.zshrc
echo 'alias cdd="cd ~/Developments"' >>~/.zshrc
echo 'alias zshconfig="nvim ~/.zshrc"' >>~/.zshrc
echo 'alias grpo="git remote prune origin"' >>~/.zshrc
echo 'alias ghprw="gh pr create --web --assignee @me --base develop"' >>~/.zshrc

##################
# remained tasks #
##################

echo "Installation is over! Now..."
echo "> p10k configure"
echo "> gh auth login"
echo "> karabiner-elements: install complex modifications from @devheedoo"
echo "> karabiner-elements: set simple modifications - right command to f18"
echo "> Keyboard > Keyboard Shortcuts > Input Sources > Select the previous input source: F18"
