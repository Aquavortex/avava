<?php

if (
    (!isset($_POST['name']) || (!isset($_POST['last_name']) || !isset($_POST['first_name'])))
    || !isset($_POST['phone'])
) {
    if (isset($_SERVER['HTTP_REFERER'])) {
        header("Location: " . $_SERVER['HTTP_REFERER']);
    } else {
        header("Location: /");
    }
}

//prepare IP
if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} elseif (!empty($_SERVER['REMOTE_ADDR'])) {
    $ip = $_SERVER['REMOTE_ADDR'];
} else {
    $ip = null;
}
if (str_contains($ip, ',')) {
    $ip = substr($ip, 0, strpos($ip, ','));
}

//Prepare DATA for lead
$name = null;
if (!empty($_POST['first_name'])) {
    $name .= $_POST['first_name'];
}
if (!empty($_POST['last_name'])) {
    if (!empty($name)) {
        $name .= ' ';
    }
    $name .= $_POST['last_name'];
}
if (!empty($_POST['name'])) {
    if (!empty($name)) {
        $name .= ' ';
    }
    $name .= $_POST['name'];
}

$data = [
    'country'    => 'UA',
    'stream_key' => 'MFjdOIyN7J',

    'name'       => $name,
    'phone'      => $_POST['phone'],
    'ip'         => $ip,
    'tz'         => !empty($_POST['tz']) ? $_POST['tz'] : null,
    'address'    => !empty($_POST['address']) ? $_POST['address'] : null,
    'city'       => !empty($_POST['city']) ? $_POST['city'] : null,
    'zip'        => !empty($_POST['zip']) ? $_POST['zip'] : null,
    'email'      => !empty($_POST['email']) ? $_POST['email'] : null,
    'password'   => !empty($_POST['password']) ? $_POST['password'] : null,
    'product_id' => !empty($_POST['product_id']) ? $_POST['product_id'] : null,
    'order'      => !empty($_POST['order']) ? $_POST['order'] : null,
    'comment'    => !empty($_POST['comment']) ? $_POST['comment'] : null,
    'user_agent' => $_SERVER['HTTP_USER_AGENT'],

    'utm_source'   => !empty($_GET['utm_source']) ? $_GET['utm_source'] : null,
    'utm_medium'   => !empty($_GET['utm_medium']) ? $_GET['utm_medium'] : null,
    'utm_campaign' => !empty($_GET['utm_campaign']) ? $_GET['utm_campaign'] : null,
    'utm_term'     => !empty($_GET['utm_term']) ? $_GET['utm_term'] : null,
    'utm_content'  => !empty($_GET['utm_content']) ? $_GET['utm_content'] : null,

    'sub_id'   => !empty($_GET['sub_id']) ? $_GET['sub_id'] : (!empty($_POST['subid']) ? $_POST['subid'] : null),
    'sub_id_1' => !empty($_GET['sub_id_1']) ? $_GET['sub_id_1'] : null,
    'sub_id_2' => !empty($_GET['sub_id_2']) ? $_GET['sub_id_2'] : null,
    'sub_id_3' => !empty($_GET['sub_id_3']) ? $_GET['sub_id_3'] : null,
    'sub_id_4' => !empty($_GET['sub_id_4']) ? $_GET['sub_id_4'] : null,

    'click_id' => !empty($_GET['click_id']) ? $_GET['click_id'] : (!empty($_POST['click_id']) ? $_POST['click_id'] : null),

    'referrer' => !empty($_POST['referrer']) ? $_POST['referrer'] : null,

    'landing_url' => !empty($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : null,
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://app.cpaecom.com/api/leads');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

//Send Lead
$result = curl_exec($ch);

$curl_error = curl_error($ch);
$curl_errno = curl_errno($ch);
$http_code  = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

//Prepare response
$response = [
    'error'     => $curl_error,
    'errno'     => $curl_errno,
    'http_code' => $http_code,
    'result'    => $result,
];

if ($http_code == 200 && $response['errno'] === 0) {
    $resultOk = json_decode($response['result'], true);
    if (!empty($resultOk['redirect_url'])) {
        header('Location: ' . $resultOk['redirect_url']);
        exit;
    }

    session_start();
    $_SESSION['data']    = $data;
    $_SESSION['lead_id'] = $resultOk['lead_id'];

    $trackingParam = '';
    if (!empty($_GET['pixel'])) {
        $trackingParam = '?pixel=' . $_GET['pixel'];
    } elseif (!empty($_GET['tiktok'])) {
        $trackingParam = '?tiktok=' . $_GET['tiktok'];
    }

    header('Location: success.php' . $trackingParam);
} else {
    echo 'response code: ' . $http_code . '<br>';
    echo 'error: ' . $curl_error . '<br>';
    echo 'response : ' . $result . '<br>';
}