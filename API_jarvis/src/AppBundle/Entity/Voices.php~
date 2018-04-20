<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Voices
 *
 * @ORM\Table(name="voices")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\VoicesRepository")
 */
class Voices
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="key_word", type="string")
     */
    private $key_word;


    /**
     * @ORM\Column(name="action", type="string")
     */
    private $action;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set key_word
     *
     * @param string $keyWord
     * @return Voices
     */
    public function setKeyWord($keyWord)
    {
        $this->key_word = $keyWord;

        return $this;
    }

    /**
     * Get key_word
     *
     * @return string 
     */
    public function getKeyWord()
    {
        return $this->key_word;
    }

    /**
     * Set action
     *
     * @param string $action
     * @return Voices
     */
    public function setAction($action)
    {
        $this->action = $action;

        return $this;
    }

    /**
     * Get action
     *
     * @return string 
     */
    public function getAction()
    {
        return $this->action;
    }
}
