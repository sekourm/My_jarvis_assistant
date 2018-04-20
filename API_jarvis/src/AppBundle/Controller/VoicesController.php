<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Voices;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\HttpFoundation\Response;

class VoicesController extends Controller
{
    public function ShowVoicesAction()
    {
        $em = $this->getDoctrine()->getManager();
        $voices = $em->getRepository('AppBundle:Voices')->findAll();

        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new GetSetMethodNormalizer());
        $serializer = new Serializer($normalizers, $encoders);
        $response = new Response($serializer->serialize($voices, 'json'));

        return $response;
    }
}
