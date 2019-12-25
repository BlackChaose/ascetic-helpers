<?php
/**
 * User: nikita.s.kalitin@gmail.com
 * Date: 19.11.19
 * Time: 17:17
 */

namespace Utility;

use PDO;


class DbUtility
{
    public $dsn;
    public $opt;
    public $pdo;

    public function __construct()
    {
        $this->dsn = DSN_MYSQL;
        $this->opt = array(
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES => false,
            \PDO::MYSQL_ATTR_INIT_COMMAND => "SET CHARACTER SET utf8"
        );
        try {
            $this->pdo = new PDO($this->dsn, DBLOGIN, DBPASS, $this->opt);
        } catch (\PDOException $e) {
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    public function getPDO()
    {
        return $this->pdo;
    }

    public function isSelectQuery($query)
    {
        try {
            $res = [];
            if (preg_match('/(UPDATE|DELETE|CREATE)/i', $query, $res) === 1) {
                return false;
            } else {
                if (preg_match('/(UPDATE|DELETE|CREATE)/i', $query, $res) === false) {
                    throw (new Exception('Error of check query!'));
                } else {
                    if (preg_match('/(UPDATE|DELETE|CREATE)/i', $query, $res) === 0) {
                        if (preg_match('/(SELECT)/i', $query, $res) === 1) {
                            return true;
                        }
                    }
                }
            }
        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode(['Error!' => $e->getMessage()]);
            die;
        }
    }

    public function validateQuery($level, $query)
    {
        try {
            switch ($level) {
                case 'select':
                    return($this->isSelectQuery($query));
                    break;
                case 'update':
                    throw (new \Exception('UPDATE disallow!'));
                    break;
                case 'create':
                    throw (new \Exception('CREATE disallow!'));
                    break;
                case 'delete':
                    throw (new \Exception('DELETE disallow!'));
                    break;
                default:
                    throw(new \Exception('Unknown Query!'));
                    break;
            }
        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode(['Error!' => $e->getMessage()]);
            die;
        }
    }

    /**
     * @param $sqlquery
     *
     * @return array
     */
    public function doSqlQuerySelect($sqlquery){
        try {
            if ($this->validateQuery('select', $sqlquery)) {

                $stmt = $this->pdo->prepare($sqlquery);
                $stmt->execute();
                $data = $stmt->fetchAll();
                return $data;
            }
        }catch(\Exception $e){
            http_response_code(400);
            echo json_encode(['Error!' => $e->getMessage()]);
            die;
        }
    }

}